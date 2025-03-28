package ua.edu.lntu.quiz.data.source

import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.auth.FirebaseUser
import kotlinx.coroutines.tasks.await
import ua.edu.lntu.quiz.data.enums.AuthErrorType
import ua.edu.lntu.quiz.data.interfaces.Result
import ua.edu.lntu.quiz.data.mapper.AuthExceptionMapper

class FirebaseDataSource {
    private val firebaseAuth: FirebaseAuth = FirebaseAuth.getInstance()
    private val authExceptionMapper = AuthExceptionMapper()

    suspend fun signInWithEmailAndPassword(email: String, password: String): Result<FirebaseUser?, AuthErrorType> {
        return try {
            firebaseAuth.signInWithEmailAndPassword(email, password).await()
            Result.Success(firebaseAuth.currentUser)
        } catch (e: Exception) {
            Result.Error(authExceptionMapper.mapException(e))
        }
    }
}