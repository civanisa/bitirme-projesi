package com.isacivan.maps.GuzergahServer.controller;

import java.util.ArrayList;
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
import org.springframework.web.client.RestTemplate;

import com.isacivan.maps.GuzergahServer.model.GuzergahSira;
import com.isacivan.maps.GuzergahServer.response.GuzergahSiraRes;
import com.isacivan.maps.GuzergahServer.response.pKayit;
import com.isacivan.maps.GuzergahServer.service.IGuzergahSira;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/guzergah-sira")
public class GuzergahSiraController {
	
	final String uri = "http://localhost:8072/p-kayit/";
	
	@Autowired
	RestTemplate restTemplate = new RestTemplate();
	
	@Autowired
	private IGuzergahSira iGuzergahSira;
	
	@GetMapping()
	public ResponseEntity<List<GuzergahSira>> get(){
		List<GuzergahSira> guzergahSiras = iGuzergahSira.getAll();
		return new ResponseEntity<List<GuzergahSira>>(guzergahSiras,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<GuzergahSira> getById(@PathVariable int id) {
		return new ResponseEntity<GuzergahSira>(iGuzergahSira.findById(id),HttpStatus.OK);
	}
	
	@GetMapping("/data")
	public ResponseEntity<List<GuzergahSiraRes>> getData(){
		List<GuzergahSiraRes> guzergahSiraRes = new ArrayList<>();
		List<GuzergahSira> guzergahSiras = iGuzergahSira.getAll();
		GuzergahSiraRes siraRes = new GuzergahSiraRes();
		for (int i = 0; i < guzergahSiras.size(); i++) {
			GuzergahSira guzergahSira = new GuzergahSira();
			guzergahSira = guzergahSiras.get(i);
			pKayit pKayit = restTemplate.getForObject(
					uri + guzergahSira.getKayit_id(), 
					pKayit.class);
			siraRes.setId(guzergahSira.getId());
			siraRes.setGuzergah_id(guzergahSira.getGuzergah_id());
			siraRes.setSira(guzergahSira.getSira());
			siraRes.setpKayit_id(pKayit.getId());
			siraRes.setpKayit_adi(pKayit.getAdSoyad());
			siraRes.setpKayit_telefon(pKayit.getKayitBil().getTelefons().get(0).getTelefon());
			siraRes.setpKayit_adres(pKayit.getKayitBil().getAdres().get(0).getAdres());
			siraRes.setpKayit_adresAciklama(pKayit.getKayitBil().getAciklama());
			guzergahSiraRes.add(siraRes);
		}
		return new ResponseEntity<List<GuzergahSiraRes>>(guzergahSiraRes,HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<List<GuzergahSira>> insert(@RequestBody List<GuzergahSira> adres) {
		try {
			iGuzergahSira.insert(adres);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping()
	public ResponseEntity<List<GuzergahSira>> update(@RequestBody List<GuzergahSira> guzergahSiras){
		try {
			iGuzergahSira.update(guzergahSiras);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping()
	@RequestMapping("/delete/{guzergah_id}")
	public ResponseEntity<?> delete(@PathVariable int guzergah_id) {
		try {
			iGuzergahSira.delete(guzergah_id);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
}
