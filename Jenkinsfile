pipeline {
agent any
    environment{
    registry = "docker-registry.contegris.com/"
    }
    stages {
      //  stage('Build') {
        //    steps {
          //      echo 'Running build automation'
            //    sh './gradlew build --no-daemon'
              //  archiveArtifacts artifacts: 'dist/node.zip'
            //}
       // }
      stage('Intializing_Builder'){
           agent { label  'Docker_builder'} 
             stages{
               stage('Buid_Docker_Image'){
               
            when {
                branch 'main'
            }
            steps {
                script {
                    app = docker.build("node_test")
            
                }
            }
        }
         
                 stage('Tag Docker Image'){
                     steps{
                     echo 'tagging Image Build Now....'
                         app.tag('docker-registry.contegris.com/node_final:latest')
                     
                     }   
                 }
                 
        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://docker-registry.contegris.com/v2', 'Docker_Registry') {
                       // app.push("${env.BUILD_NUMBER}")
                        app.push('lastest')
                    }
                    }
                }
            }
        }
         }
         }
         }
         
