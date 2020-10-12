package com.isacivan.maps.KullaniciServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.KullaniciServer.model.Telefon;

@Repository
public class TelefonDal implements ITelefon{

	private EntityManager entityManager;

	@Autowired
	public TelefonDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<Telefon> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Telefon> telefons = session.createQuery("from Telefon", Telefon.class)
				.getResultList();
		return telefons;
	}
	
	@Override
	@Transactional
	public Telefon findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		Telefon telefon = session.get(Telefon.class, id);
		return telefon;
	}

	@Override
	@Transactional
	public void insert(List<Telefon> telefon) {
		Session session = entityManager.unwrap(Session.class);
		for (Telefon key : telefon) {
			session.save(key);
		}
	}
	
	@Override
	@Transactional
	public void update(List<Telefon> telefon) {
		Session session = entityManager.unwrap(Session.class);
		for (Telefon key : telefon) {
			session.update(key);
		}
	}

	@Override
	@Transactional
	public void delete(int telefon_bil_id) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("DELETE FROM Telefon WHERE telefon_bil_id = " + telefon_bil_id);
		query.executeUpdate();
	}
}
