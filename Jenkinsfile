pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Running build automation'
                sh './gradlew build --no-daemon'
                archiveArtifacts artifacts: 'dist/node.zip'
            }
        }
      stage('Intializing_Builder'){
           agent { label  'Docker_builder'} 
             stages{
               stage('Buid_Docker_Image'){
               
            when {
                branch 'master'
            }
            steps {
                script {
                    app = docker.build("hamza/node")
                    app.inside {
                        sh 'echo $(curl localhost:8080)'
                    }
                }
            }
        }
        stage('Push Docker Image') {
            when {
                branch 'master'
            }
            steps {
                script {
                    docker.withRegistry('https://docker-registry.contegris.com', 'Docker_Registry') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
             }
