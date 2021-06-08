package com.playonomics.session.domain.models

import com.fasterxml.jackson.annotation.JsonInclude

@JsonInclude(JsonInclude.Include.NON_NULL)
data class SessionResponse(var id : String? = null, var message : String? = null, var session : Session? = null )