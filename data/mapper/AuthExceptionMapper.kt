package ua.edu.lntu.quiz.data.mapper

import com.google.firebase.auth.*
import ua.edu.lntu.quiz.data.enums.AuthErrorType

class AuthExceptionMapper {
    fun mapException(exception: Exception?): AuthErrorType {
        return when (exception) {
            is FirebaseAuthInvalidCredentialsException -> AuthErrorType.INVALID_CREDENTIALS
            is FirebaseAuthWeakPasswordException -> AuthErrorType.WEAK_PASSWORD
            is FirebaseAuthRecentLoginRequiredException -> AuthErrorType.REQUIRES_RECENT_LOGIN
            is FirebaseAuthMultiFactorException -> AuthErrorType.MULTI_FACTOR_AUTH_REQUIRED
            is FirebaseAuthMissingActivityForRecaptchaException -> AuthErrorType.MISSING_ACTIVITY_FOR_RECAPTCHA
            is FirebaseAuthEmailException -> AuthErrorType.EMAIL_NOT_VERIFIED
            is FirebaseAuthActionCodeException, is FirebaseAuthWebException -> AuthErrorType.NETWORK_ERROR

            is FirebaseAuthException -> {
                when (exception.errorCode) {
                    "ERROR_WEB_CONTEXT_ALREADY_PRESENTED" -> AuthErrorType.WEB_CONTEXT_ALREADY_PRESENTED
                    "ERROR_WEB_CONTEXT_CANCELED" -> AuthErrorType.WEB_CONTEXT_CANCELED
                    "ERROR_WEB_STORAGE_UNSUPPORTED" -> AuthErrorType.WEB_STORAGE_UNSUPPORTED
                    "ERROR_WEB_INTERNAL_ERROR" -> AuthErrorType.WEB_INTERNAL_ERROR

                    "ERROR_EMAIL_ALREADY_IN_USE" -> AuthErrorType.EMAIL_ALREADY_IN_USE
                    "ERROR_ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL" -> AuthErrorType.ACCOUNT_EXISTS_WITH_DIFFERENT_CREDENTIAL
                    "ERROR_CREDENTIAL_ALREADY_IN_USE" -> AuthErrorType.CREDENTIAL_ALREADY_IN_USE

                    "ERROR_USER_DISABLED" -> AuthErrorType.USER_DISABLED
                    "ERROR_USER_NOT_FOUND" -> AuthErrorType.USER_NOT_FOUND
                    "ERROR_USER_TOKEN_EXPIRED" -> AuthErrorType.USER_TOKEN_EXPIRED
                    "ERROR_INVALID_USER_TOKEN" -> AuthErrorType.INVALID_USER_TOKEN

                    else -> AuthErrorType.UNKNOWN_ERROR
                }
            }

            else -> AuthErrorType.UNKNOWN_ERROR
        }
    }
}