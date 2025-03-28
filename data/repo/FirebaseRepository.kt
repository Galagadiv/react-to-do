package ua.edu.lntu.quiz.data.repo

import com.google.firebase.auth.FirebaseUser
import ua.edu.lntu.quiz.data.enums.AuthErrorType
import ua.edu.lntu.quiz.data.source.FirebaseDataSource
import ua.edu.lntu.quiz.data.interfaces.Result

class FirebaseRepository(private val firebaseDataSource: FirebaseDataSource) {

    suspend fun signInWithEmailAndPassword(email: String, password: String): Result<FirebaseUser?, AuthErrorType> {
        return firebaseDataSource.signInWithEmailAndPassword(email, password)
    }
}

