package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.KullaniciServer.model.pKayit;

@Repository
public class pKayitDal implements IpKayit{

	private EntityManager entityManager;

	@Autowired
	public pKayitDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<pKayit> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<pKayit> pKayits = session.createQuery("from pKayit", pKayit.class)
				.getResultList();
		return pKayits;
	}
	
	@Override
	@Transactional
	public pKayit getById(int id) {
		Session session = entityManager.unwrap(Session.class);
		pKayit pKayit = session.get(pKayit.class, id);
		return pKayit;
	}

	@Override
	@Transactional
	public List<pKayit> getByIKayitId(int id) {
		Session session = entityManager.unwrap(Session.class);
		List<pKayit> pKayits = session.createQuery("from pKayit where ikayit_id = " + id, pKayit.class)
				.getResultList();
		return pKayits;
	}
	
	@Override
	@Transactional
	public void insert(pKayit pKayit) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(pKayit);
	}
	
	@Override
	@Transactional
	public void update(pKayit pKayit) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("UPDATE pKayit "
				+ "SET kayit_ad_soyad='" + pKayit.getAdSoyad() + "', ikayit_id= "+ pKayit.getIkayit_id() + "WHERE id = " + pKayit.getId());
		query.executeUpdate();
	}

	@Override
	@Transactional
	public void delete(int pKayit) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("DELETE FROM pKayit WHERE id = " + pKayit);
		query.executeUpdate();
	}
}
