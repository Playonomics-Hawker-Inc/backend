package com.playonomics.session

import com.fasterxml.jackson.databind.ObjectMapper
import com.playonomics.session.domain.models.Session
import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.cloud.client.discovery.EnableDiscoveryClient
import org.springframework.context.annotation.Bean
import org.springframework.data.redis.connection.ReactiveRedisConnectionFactory
import org.springframework.data.redis.core.ReactiveRedisTemplate
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer
import org.springframework.data.redis.serializer.RedisSerializationContext.newSerializationContext
import org.springframework.data.redis.serializer.StringRedisSerializer


/**
 * https://todd.ginsberg.com/post/springboot-reactive-kotlin-coroutines/
 */
@EnableDiscoveryClient
@SpringBootApplication
class SessionStoreApplication {

    @Bean
    fun reactiveRedisTemplate(
        connectionFactory: ReactiveRedisConnectionFactory,
        objectMapper: ObjectMapper
    ): ReactiveRedisTemplate<String, Session> {

        val valueSerializer = Jackson2JsonRedisSerializer(Session::class.java).apply {
            setObjectMapper(objectMapper)
        }

        return ReactiveRedisTemplate(
            connectionFactory,
            newSerializationContext<String, Session>(StringRedisSerializer())
                .value(valueSerializer)
                .build()
        )
    }

    companion object {
        @JvmStatic
        fun main(args: Array<String>) {
            SpringApplication.run(SessionStoreApplication::class.java, *args)
        }
    }
}
