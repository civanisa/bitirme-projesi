package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import com.isacivan.maps.KullaniciServer.model.Telefon;

public interface ITelefon {
	List<Telefon> getAll();
	Telefon findById(int id);
	void insert(List<Telefon> adres);
	void update(List<Telefon> telefon);
	void delete(int telefon);
}
