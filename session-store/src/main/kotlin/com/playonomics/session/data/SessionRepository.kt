package com.playonomics.session.data

import com.playonomics.session.domain.models.Session
import com.playonomics.session.domain.models.SessionRequest
import com.playonomics.session.domain.models.SessionResponse

interface SessionRepository {

    suspend fun createSession(session : SessionRequest) : SessionResponse

    suspend fun getSession(id : String) : SessionResponse?

    suspend fun killSession(id : String) : SessionResponse
}