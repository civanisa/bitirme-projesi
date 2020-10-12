package com.isacivan.maps.MahalleService.DataAcces;

import java.util.List;

import com.isacivan.maps.MahalleService.Entities.Mahalle;

public interface IMahalleDal {
	List<Mahalle> getAll();
	void insert(Mahalle mahalle);
	void update();
	void delete();
	Mahalle getById(int id);
}
