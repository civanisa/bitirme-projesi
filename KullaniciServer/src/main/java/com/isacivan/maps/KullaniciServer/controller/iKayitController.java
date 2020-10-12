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
import com.isacivan.maps.KullaniciServer.model.iKayit;
import com.isacivan.maps.KullaniciServer.request.iKayitDel;
import com.isacivan.maps.KullaniciServer.service.IAdres;
import com.isacivan.maps.KullaniciServer.service.IKayitBil;
import com.isacivan.maps.KullaniciServer.service.ITelefon;
import com.isacivan.maps.KullaniciServer.service.IiKayit;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/i-kayit")
public class iKayitController {

	@Autowired
	private IiKayit iiKayit;
	
	@Autowired
	private IKayitBil iKayitBil;
	
	@Autowired
	private IAdres iAdres;
	
	@Autowired
	private ITelefon iTelefon;
	
	@GetMapping()
	public ResponseEntity<List<iKayit>> get(){
		List<iKayit> mahalles = iiKayit.getAll();
		return new ResponseEntity<List<iKayit>>(mahalles,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<iKayit> getById(@PathVariable int id) {
		return new ResponseEntity<iKayit>(iiKayit.getById(id),HttpStatus.OK);
	}
	
	@GetMapping("user/{id}")
	public ResponseEntity<List<iKayit>> getByUserId(@PathVariable int id) {
		return new ResponseEntity<List<iKayit>>(iiKayit.geyByUserId(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<iKayit> insert(@RequestBody iKayit iKayit) {
		try {
			KayitBil kayitBil = iKayit.getKayitBil();
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
			iiKayit.insert(iKayit);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PutMapping
	public ResponseEntity<iKayit> update(@RequestBody iKayit iKayit) {
		try {
			KayitBil kayitBil = iKayit.getKayitBil();
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
			iiKayit.update(iKayit);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PostMapping()
	@RequestMapping("/delete")
	public ResponseEntity<iKayitDel> delete(@RequestBody iKayitDel iKayitDel) {
		try {
			iTelefon.delete(iKayitDel.getiKayitBilId());
			iAdres.delete(iKayitDel.getiKayitBilId());
			iiKayit.delete(iKayitDel.getiKayitId());
			iKayitBil.delete(iKayitDel.getiKayitBilId());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
