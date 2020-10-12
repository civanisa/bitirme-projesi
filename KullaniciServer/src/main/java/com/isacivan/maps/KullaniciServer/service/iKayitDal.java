package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.KullaniciServer.model.iKayit;

@Repository
public class iKayitDal implements IiKayit{

	private EntityManager entityManager;

	@Autowired
	public iKayitDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<iKayit> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<iKayit> iKayits = session.createQuery("from iKayit", iKayit.class)
				.getResultList();
		return iKayits;	
	}
	
	@Override
	@Transactional
	public iKayit getById(int id) {
		Session session = entityManager.unwrap(Session.class);
		iKayit iKayit = session.get(iKayit.class, id);
		return iKayit;
	}
	
	
	@Override
	@Transactional
	public List<iKayit> geyByUserId(int id) {
		Session session = entityManager.unwrap(Session.class);
		List<iKayit> iKayits = session.createQuery("from iKayit where user_id = " + id, iKayit.class)
				.getResultList();
		return iKayits;
	}
	
	@Override
	@Transactional
	public void insert(iKayit iKayit) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(iKayit);
	}
	
	@Override
	@Transactional
	public void update(iKayit iKayit) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("UPDATE iKayit "
				+ "SET adi='" + iKayit.getAdi() + "'WHERE id = " + iKayit.getId());
		query.executeUpdate();
	}

	@Override
	@Transactional
	public void delete(int iKayit) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("DELETE FROM iKayit WHERE id = " + iKayit);
		query.executeUpdate();
	}
}
