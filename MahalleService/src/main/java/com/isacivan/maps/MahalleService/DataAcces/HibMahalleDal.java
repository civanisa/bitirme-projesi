package com.isacivan.maps.MahalleService.DataAcces;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.isacivan.maps.MahalleService.Entities.Mahalle;

@Repository
public class HibMahalleDal implements IMahalleDal{

	private EntityManager entityManager;
	
	@Autowired
	public  HibMahalleDal(EntityManager entityManager) {
		this.entityManager = entityManager;
	}
	
	@Override
	@Transactional
	public List<Mahalle> getAll() {
		Session session = entityManager.unwrap(Session.class);
		List<Mahalle> mahalles = session.createQuery("from Mahalle",Mahalle.class)
				.getResultList();
		return mahalles;
	}

	@Override
	@Transactional
	public void insert(Mahalle mahalle) {
		Session session = entityManager.unwrap(Session.class);
		session.saveOrUpdate(mahalle);
		
	}

	@Override
	@Transactional
	public void update() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void delete() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Mahalle getById(int id) {
		Session session = entityManager.unwrap(Session.class);
		Mahalle mahalle = session.get(Mahalle.class, id);
		return mahalle;
	}	
}
