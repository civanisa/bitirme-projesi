package com.isacivan.maps.GuzergahServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.GuzergahServer.model.Guzergah;

@Repository
public class GuzergahDal implements IGuzergah{
	
	private EntityManager entityManager;
	
	@Autowired
	public GuzergahDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<Guzergah> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Guzergah> guzergahs = session.createQuery("from Guzergah", Guzergah.class)
				.getResultList();
		return guzergahs;
	}

	@Override
	@Transactional
	public Guzergah findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		Guzergah guzergah = session.get(Guzergah.class, id);
		return guzergah;
	}
	
	@Override
	@Transactional
	public List<Guzergah> getByIKayitId(int id) {
		Session session = entityManager.unwrap(Session.class);
		List<Guzergah> guzergahs = session.createQuery("from Guzergah where ikayit_id = " + id, Guzergah.class)
				.getResultList();
		return guzergahs;
	}

	@Override
	@Transactional
	public void insert(Guzergah guzergah) {
		Session session = entityManager.unwrap(Session.class);
		session.save(guzergah);
	}
	
	@Override
	@Transactional
	public void update(Guzergah guzergah) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query = session.createQuery("UPDATE Guzergah "
				+ "SET aciklama='" + guzergah.getAciklama() + "', adi= "+ guzergah.getAdi() + "', ikayit_id= "+ guzergah.getIkayit_id() + "WHERE id = " + guzergah.getId());
		query.executeUpdate();
	}
	
}
