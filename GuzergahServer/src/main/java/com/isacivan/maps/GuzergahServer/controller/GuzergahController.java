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

import com.isacivan.maps.GuzergahServer.model.Guzergah;
import com.isacivan.maps.GuzergahServer.model.GuzergahSira;
import com.isacivan.maps.GuzergahServer.response.GuzergahRes;
import com.isacivan.maps.GuzergahServer.response.GuzergahSiraRes;
import com.isacivan.maps.GuzergahServer.response.pKayit;
import com.isacivan.maps.GuzergahServer.service.IGuzergah;
import com.isacivan.maps.GuzergahServer.service.IGuzergahSira;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/guzergah")
public class GuzergahController {
	
	final String uri = "http://localhost:8072/p-kayit/";
	
	@Autowired
	RestTemplate restTemplate = new RestTemplate();
	
	@Autowired
	private IGuzergah iGuzergah;
	
	@Autowired
	private IGuzergahSira iGuzergahSira;
	
	@GetMapping()
	public ResponseEntity<List<Guzergah>> get(){
		List<Guzergah> guzergahs = iGuzergah.getAll();
		return new ResponseEntity<List<Guzergah>>(guzergahs,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Guzergah> getById(@PathVariable int id) {
		return new ResponseEntity<Guzergah>(iGuzergah.findById(id),HttpStatus.OK);
	}
	
	@GetMapping("/i-kayit/{id}")
	public ResponseEntity<List<Guzergah>> getByIKayitId(@PathVariable int id) {
		return new ResponseEntity<List<Guzergah>>(iGuzergah.getByIKayitId(id),HttpStatus.OK);
	}
	
	@GetMapping("/data")
	public ResponseEntity<List<GuzergahRes>> getData(){
		List<GuzergahRes> guzergahRess = new ArrayList<>();
		List<GuzergahSiraRes> guzergahSiraRes = new ArrayList<>();
		List<Guzergah> guzergahs = iGuzergah.getAll();
		List<GuzergahSira>guzergahSiras = new ArrayList<>();
		Guzergah guzergah = new Guzergah();
		for (int i = 0; i < guzergahs.size(); i++) {
			GuzergahRes guzergahRes = new GuzergahRes();
			guzergah = guzergahs.get(i);
			guzergahRes.setId(guzergah.getId());
			guzergahRes.setAdi(guzergah.getAdi());
			guzergahRes.setAciklama(guzergah.getAciklama());
			guzergahSiras = guzergah.getGuzergahSira();
			for (int j = 0; j < guzergahSiras.size(); j++) {
				GuzergahSira guzergahSira = new GuzergahSira();
				GuzergahSiraRes siraRes = new GuzergahSiraRes();
				guzergahSira = guzergahSiras.get(j);
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
			guzergahRes.setGuzergahSiraRes(guzergahSiraRes);
			guzergahRess.add(guzergahRes);
		}
		return new ResponseEntity<List<GuzergahRes>>(guzergahRess,HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<Guzergah> insert(@RequestBody Guzergah guzergah) {
		try {
			List<GuzergahSira> guzergahSiras = guzergah.getGuzergahSira();
			guzergah.setGuzergahSira(null);
			iGuzergah.insert(guzergah);
			int id = guzergah.getId();
			for (int j = 0; j < guzergahSiras.size(); j++) {
				guzergahSiras.get(j).setGuzergah_id(id);
			}
			iGuzergahSira.insert(guzergahSiras);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PostMapping("/all")
	public ResponseEntity<List<Guzergah>> inserts(@RequestBody List<Guzergah> guzergahs) {
		try {
			for (int i = 0; i < guzergahs.size(); i++) {
				Guzergah guzergah = guzergahs.get(i);
				List<GuzergahSira> guzergahSiras = guzergah.getGuzergahSira();
				guzergah.setGuzergahSira(null);
				iGuzergah.insert(guzergah);
				int id = guzergah.getId();
				for (int j = 0; j < guzergahSiras.size(); j++) {
					guzergahSiras.get(j).setGuzergah_id(id);
				}
				iGuzergahSira.insert(guzergahSiras);
			}
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
	
	@PutMapping()
	public ResponseEntity<List<Guzergah>> update(@RequestBody List<Guzergah> guzergahs){
		try {
			for (int i = 0; i < guzergahs.size(); i++) {
				Guzergah guzergah = guzergahs.get(i);
				//List<GuzergahSira> guzergahSiras = guzergah.getGuzergahSira();
				guzergah.setGuzergahSira(null);
				iGuzergah.update(guzergah);
				/*int id = guzergah.getId();
				for (int j = 0; j < guzergahSiras.size(); j++) {
					guzergahSiras.get(j).setGuzergah_id(id);
				}
				iGuzergahSira.update(guzergahSiras);*/
			}
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
