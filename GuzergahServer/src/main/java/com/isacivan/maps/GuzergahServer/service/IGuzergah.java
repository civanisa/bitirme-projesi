package com.isacivan.maps.GuzergahServer.service;

import java.util.List;

import com.isacivan.maps.GuzergahServer.model.Guzergah;

public interface IGuzergah {
	List<Guzergah> getAll();
	List<Guzergah> getByIKayitId(int id);
	Guzergah findById(int id);
	void insert(Guzergah adres);
	void update(Guzergah adres);
}
