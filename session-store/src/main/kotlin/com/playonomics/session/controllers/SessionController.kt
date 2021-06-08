package com.playonomics.session.controllers

import com.playonomics.session.data.SessionRepository
import com.playonomics.session.domain.models.Session
import com.playonomics.session.domain.models.SessionRequest
import com.playonomics.session.domain.models.SessionResponse
import org.springframework.web.bind.annotation.*

@RestController
class SessionController (private val repo: SessionRepository){

    @PostMapping("/v1")
    suspend fun create(@RequestBody session : SessionRequest): SessionResponse = repo.createSession(session)

    @PostMapping("/v1/me")
    suspend fun getSession(@RequestBody session : SessionRequest): SessionResponse? = repo.getSession(session.id)

    @DeleteMapping("/v1/logout")
    suspend fun killSession(@RequestBody session : SessionRequest): SessionResponse = repo.killSession(session.id)
}