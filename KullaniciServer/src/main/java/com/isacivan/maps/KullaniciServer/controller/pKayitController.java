package com.isacivan.maps.KullaniciServer.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacivan.maps.KullaniciServer.model.Adres;
import com.isacivan.maps.KullaniciServer.model.KayitBil;
import com.isacivan.maps.KullaniciServer.model.Telefon;
import com.isacivan.maps.KullaniciServer.model.pKayit;
import com.isacivan.maps.KullaniciServer.request.pKayitDel;
import com.isacivan.maps.KullaniciServer.service.IAdres;
import com.isacivan.maps.KullaniciServer.service.IKayitBil;
import com.isacivan.maps.KullaniciServer.service.ITelefon;
import com.isacivan.maps.KullaniciServer.service.IpKayit;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/p-kayit")
public class pKayitController {
	
	@Autowired
	private IpKayit ipKayit;
	
	@Autowired
	private IKayitBil iKayitBil;
	
	@Autowired
	private IAdres iAdres;
	
	@Autowired
	private ITelefon iTelefon;
	
	@GetMapping()
	public ResponseEntity<List<pKayit>> get(){
		List<pKayit> pKayits = ipKayit.getAll();
		return new ResponseEntity<List<pKayit>>(pKayits,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<pKayit> getById(@PathVariable int id) {
		return new ResponseEntity<pKayit>(ipKayit.getById(id),HttpStatus.OK);
	}
	
	@GetMapping("i-kayit/{id}")
	public ResponseEntity<List<pKayit>> getByIKayitId(@PathVariable int id) {
		return new ResponseEntity<List<pKayit>>(ipKayit.getByIKayitId(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<pKayit> insert(@RequestBody pKayit pKayit) {
		try {
			KayitBil kayitBil = pKayit.getKayitBil();
			List<Adres> adres = kayitBil.getAdres();
			List<Telefon> telefons = kayitBil.getTelefons();
			kayitBil.setAdres(null);
			kayitBil.setTelefons(null);
			iKayitBil.insert(kayitBil);
			int id = kayitBil.getId();
			for (int i = 0; i < adres.size(); i++) {
				adres.get(i).setAdres_bil_id(id);
			}
			iAdres.insert(adres);
			for (int i = 0; i < telefons.size(); i++) {
				telefons.get(i).setTelefon_bil_id(id);
			}
			iTelefon.insert(telefons);
			ipKayit.insert(pKayit);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PutMapping
	public String update(@RequestBody pKayit pKayit) {
		KayitBil kayitBil = pKayit.getKayitBil();
		List<Adres> adres = kayitBil.getAdres();
		List<Telefon> telefons = kayitBil.getTelefons();
		kayitBil.setAdres(null);
		kayitBil.setTelefons(null);
		iKayitBil.update(kayitBil);
		int id = kayitBil.getId();
		for (int i = 0; i < adres.size(); i++) {
			adres.get(i).setAdres_bil_id(id);
		}
		iAdres.update(adres);
		for (int i = 0; i < telefons.size(); i++) {
			telefons.get(i).setTelefon_bil_id(id);
		}
		iTelefon.update(telefons);
		ipKayit.update(pKayit);
		return "Succes Update";
	}
	
	@PostMapping()
	@RequestMapping("/delete")
	public ResponseEntity<?> delete(@RequestBody pKayitDel pKayitDel) {
		try {
			iTelefon.delete(pKayitDel.getKayitBilId());
			iAdres.delete(pKayitDel.getKayitBilId());
			ipKayit.delete(pKayitDel.getpKayitId());
			iKayitBil.delete(pKayitDel.getKayitBilId());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
