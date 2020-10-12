package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.KullaniciServer.model.KayitBil;

@Repository
public class KayitBilDal implements IKayitBil {

	private EntityManager entityManager;

	@Autowired
	public KayitBilDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<KayitBil> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<KayitBil> kayitBils = session.createQuery("from KayitBil", KayitBil.class)
				.getResultList();
		return kayitBils;
	}
	
	@Override
	@Transactional
	public KayitBil findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		KayitBil kayitBil = session.get(KayitBil.class, id);
		return kayitBil;
	}

	@Override
	@Transactional
	public void insert(KayitBil kayitBil) {
		Session session = entityManager.unwrap(Session.class);
		session.save(kayitBil);
	}
	
	@Override
	@Transactional
	public void update(KayitBil kayitBil) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("UPDATE KayitBil "
				+ "SET aciklama='" + kayitBil.getAciklama() + "'WHERE id = " + kayitBil.getId());
		query.executeUpdate();
	}

	@Override
	@Transactional
	public void delete(int kayitBil) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("DELETE FROM KayitBil WHERE id = " + kayitBil);
		query.executeUpdate();
	}
}
