package com.isacivan.maps.MahalleService.DataAcces;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.MahalleService.Entities.Locations;

@Repository
public class HibLocationsDal implements ILocationsDal{

	private EntityManager entityManager;

	@Autowired
	public HibLocationsDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}

	@Override
	@Transactional
	public List<Locations> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Locations> locations = session.createQuery("from Locations", Locations.class)
				.getResultList();
		return locations;
	}

	@Override
	@Transactional
	public void insert(List<Locations> locations) {
		Session session = entityManager.unwrap(Session.class);
		for (Locations key : locations) {
			session.saveOrUpdate(key);
		}
	}
}
