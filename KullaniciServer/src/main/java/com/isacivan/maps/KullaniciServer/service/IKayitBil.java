package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import com.isacivan.maps.KullaniciServer.model.KayitBil;

public interface IKayitBil {
	List<KayitBil> getAll();
	KayitBil findById(int id);
	void insert(KayitBil kayitBil);
	void update(KayitBil kayitBil);
	void delete(int kayitBil);
}
