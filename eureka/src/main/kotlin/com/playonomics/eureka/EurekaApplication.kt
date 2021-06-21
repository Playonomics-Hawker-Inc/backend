package com.playonomics.eureka

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.web.servlet.config.annotation.CorsRegistry
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer

@EnableEurekaServer
@SpringBootApplication
class EurekaApplication : WebMvcConfigurer {
    @EnableWebSecurity
    internal class WebSecurityConfig : WebSecurityConfigurerAdapter() {
        @Throws(Exception::class)
        override fun configure(http: HttpSecurity) {
            http.csrf().ignoringAntMatchers("/eureka/**")
            super.configure(http)
        }
    }

    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**").allowedHeaders("Authorization", "content-type", "x-auth-token")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS").maxAge(3600L)
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(EurekaApplication::class.java, *args)
        }
    }
}


