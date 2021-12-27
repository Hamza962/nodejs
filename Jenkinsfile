pipeline {
agent any
    environment{
    registry = "docker-registry.contegris.com/"
    }    
    
    
 triggers {
        githubPush()
   pollSCM('') // Enabling being build on Push
  }
    
    stages {
      //  stage('Build') {
        //    steps {
          //      echo 'Running build automation'
            //    sh './gradlew build --no-daemon'
              //  archiveArtifacts artifacts: 'dist/node.zip'
            //}
       // }
      stage('Intializing_Builder..'){
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
                         script{
                             try {
                             sh 'docker image inspect  docker-registry.contegris.com/node_test:2.0'
                                 error("Image => node_test With tag 2.0 Alreadt Exits")
                             }
                                                  
                         catch(err){
                         app.tag()
                         }
                         }
                     }   
                 }
                 
        stage('Push Docker Image') {
            when {
                branch 'main'
            }
            steps {
                script {
                    docker.withRegistry('https://docker-registry.contegris.com/v2', 'Docker_Registry') {
                        env.WORKSPACE = pwd()
                        def version = readFile "${env.WORKSPACE}/example_env"
                        app.push(version)
                     //   app.push('lastest')
                    }
                    }
            }
     }
                 stage("Deployment_to_DEV"){
                     steps{
                     script{ 
                     sh 'echo Testing'
                     }
                 }
                 }
        }
         }
         }
         }
         
