package com.isacivan.maps.MahalleService.DataAcces;

import java.util.List;

import com.isacivan.maps.MahalleService.Entities.Locations;

public interface ILocationsDal {
	List<Locations> getAll();
	void insert(List<Locations> locations);
}
