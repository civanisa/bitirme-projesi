package com.isacivan.maps.MahalleService.RestApi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.isacivan.maps.MahalleService.DataAcces.ILocationsDal;
import com.isacivan.maps.MahalleService.DataAcces.IMahalleDal;
import com.isacivan.maps.MahalleService.Entities.Locations;
import com.isacivan.maps.MahalleService.Entities.Mahalle;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/mahalle")
public class MahalleController {
	
	@Autowired
	private IMahalleDal mahalleDal;
	
	@Autowired
	private ILocationsDal locationDal;
	
	
	@GetMapping()
	public ResponseEntity<List<Mahalle>> get(){
		List<Mahalle> mahalles = mahalleDal.getAll();
		return new ResponseEntity<List<Mahalle>>(mahalles,HttpStatus.OK);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Mahalle> getById(@PathVariable int id) {
		return new ResponseEntity<Mahalle>(mahalleDal.getById(id),HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> insert(@RequestBody Mahalle mahalle) {
		try {
			List<Locations> locations = mahalle.getLocations();
			mahalle.setLocations(null);
			mahalleDal.insert(mahalle);
			int id = mahalle.getId();
			for (int i = 0; i < locations.size(); i++) {
				locations.get(i).setMahalle_id(id);;
			}
			locationDal.insert(locations);
			return new ResponseEntity<>(HttpStatus.OK);
		}catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
		}
	}
}
