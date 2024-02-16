package com.kilopolo.sgtep.service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;


import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;

@Service
public class FirebaseService {

    @PostConstruct
    public void initializeFirebaseApp() throws IOException {
//        InputStream serviceAccount = this.getClass().getResourceAsStream("/firebase-service-credentials.json");
//
//        FirebaseOptions options = new FirebaseOptions.Builder()
//                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
//                .setDatabaseUrl("https://fir-ml-bf63d.firebaseio.com").build();
//
//        FirebaseApp.initializeApp(options);
        FileInputStream serviceAccount =
                new FileInputStream("path/to/serviceAccountKey.json");

        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();

        FirebaseApp.initializeApp(options);

    }

}