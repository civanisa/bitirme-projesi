package com.isacivan.maps.KullaniciServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class KullaniciServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(KullaniciServerApplication.class, args);
	}

}
