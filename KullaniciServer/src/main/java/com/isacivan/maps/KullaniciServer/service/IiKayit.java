package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import com.isacivan.maps.KullaniciServer.model.iKayit;

public interface IiKayit {
	List<iKayit> getAll();
	List<iKayit> geyByUserId(int id);
	iKayit getById(int id);
	void insert(iKayit iKayit);
	void update(iKayit iKayit);
	void delete(int iKayit);
}
