package com.isacivan.maps.GuzergahServer.service;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.GuzergahServer.model.GuzergahSira;

@Repository
public class GuzergahSiraDal implements IGuzergahSira {

	private EntityManager entityManager;
	
	@Autowired
	public GuzergahSiraDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<GuzergahSira> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<GuzergahSira> guzergahSiras = session.createQuery("from GuzergahSira", GuzergahSira.class)
				.getResultList();
		return guzergahSiras;
	}

	@Override
	@Transactional
	public GuzergahSira findById(int id) {
		Session session = entityManager.unwrap(Session.class);
		GuzergahSira guzergahSira = session.get(GuzergahSira.class,id);
		return guzergahSira;
	}

	@Override
	@Transactional
	public void insert(List<GuzergahSira> guzergahSira) {
		Session session = entityManager.unwrap(Session.class);
		for (GuzergahSira key : guzergahSira) {
			session.save(key);
		}
	}

	@Override
	@Transactional
	public void update(List<GuzergahSira> guzergahSira) {
		Session session = entityManager.unwrap(Session.class);
		for (GuzergahSira key : guzergahSira) {
			session.saveOrUpdate(key);
		}
	}

	@Override
	@Transactional
	public void delete(int guzergah_id) {
		Session session = entityManager.unwrap(Session.class);
		Query<?> query =session.createQuery("DELETE FROM GuzergahSira WHERE guzergah_id = " + guzergah_id);
		query.executeUpdate();
	}
}
