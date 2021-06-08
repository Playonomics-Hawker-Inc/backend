package com.playonomics.session.data.impl

import com.playonomics.session.data.SessionRepository
import com.playonomics.session.domain.models.Session
import com.playonomics.session.domain.models.SessionRequest
import com.playonomics.session.domain.models.SessionResponse
import org.springframework.data.redis.core.*
import org.springframework.stereotype.Repository
import java.time.Duration

@Repository
class SessionRepositoryImpl(private val redisTemplate: ReactiveRedisTemplate<String, Session>) : SessionRepository {


    /**
     * Create user session
     */
    override suspend fun createSession(request: SessionRequest): SessionResponse {
        val session = Session(request.id, request.token, true, request.roles)
        //persist the user session
        redisTemplate.opsForValue().setAndAwait(session.id, session).also {
            redisTemplate.expireAndAwait(session.id, Duration.ofDays(2))  // session cache expiry for 2 days
        }
        return SessionResponse(session.id, "Success")
    }

    /**
     * Delete session on logout
     */
    override suspend fun getSession(id: String): SessionResponse? {
        val userSession  =  redisTemplate.opsForValue().getAndAwait(id)
        return SessionResponse(session=userSession)

    }


    /**
     *
     */
    override suspend fun killSession(id: String): SessionResponse {
         redisTemplate.opsForValue().deleteAndAwait(id).also { return SessionResponse(id, "Session deleted") }
    }
}