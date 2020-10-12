package com.isacivan.maps.GuzergahServer.service;

import java.util.List;

import com.isacivan.maps.GuzergahServer.model.GuzergahSira;

public interface IGuzergahSira {
	List<GuzergahSira> getAll();
	GuzergahSira findById(int id);
	void insert(List<GuzergahSira> adres);
	void update(List<GuzergahSira> adres);
	void delete(int guzergah_id);
}
