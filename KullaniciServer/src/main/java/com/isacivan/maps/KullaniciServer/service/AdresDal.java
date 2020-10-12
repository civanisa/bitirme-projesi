package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.KullaniciServer.model.Adres;

@Repository
public class AdresDal implements IAdres{

	private EntityManager entityManager;

	@Autowired
	public AdresDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<Adres> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Adres> adres = session.createQuery("from Adres", Adres.class)
				.getResultList();
		return adres;
	}
	
	@Override
	@Transactional
	public Adres findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		Adres adres = session.get(Adres.class, id);
		return adres;
	}

	@Override
	@Transactional
	public void insert(List<Adres> adres) {
		Session session = entityManager.unwrap(Session.class);
		for (Adres key : adres) {
			session.save(key);
		}
	}
	
	@Override
	@Transactional
	public void update(List<Adres> adres) {
		Session session = entityManager.unwrap(Session.class);
		for (Adres key : adres) {
			session.update(key);
		}
	}

	@Override
	@Transactional
	public void delete(int adres_bil_id) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query =session.createQuery("DELETE FROM Adres WHERE adres_bil_id = " + adres_bil_id);
		query.executeUpdate();
	}
}
