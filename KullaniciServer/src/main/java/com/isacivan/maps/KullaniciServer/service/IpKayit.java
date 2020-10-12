package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import com.isacivan.maps.KullaniciServer.model.pKayit;

public interface IpKayit {
	List<pKayit> getAll();
	List<pKayit> getByIKayitId(int id);
	pKayit getById(int id);
	void update(pKayit pKayit);
	void insert(pKayit pKayit);
	void delete(int pKayitDel);
}
