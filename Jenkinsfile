pipeline {
agent any
    environment{
    registry = "docker-registry.contegris.com"    
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
                        echo 'checking tag EXISTS'
                         script{
                            version = readFile "${env.WORKSPACE}/example_env"
                            env.WORKSPACE = pwd()
                            
                             def status_check = sh returnStatus: true, script:"""docker image inspect  ${registry}/node_test:${version}"""
                             if(status_check == 0)
                             {
                              error('Tag Already Exists')
                              currentBuild.result = 'FAILURE'
                             }
                             else{
                              echo'tagging Image Now....' 
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
                    env.WORKSPACE = pwd()
                    //def version = readFile "${env.WORKSPACE}/example_env"
                    docker.withRegistry('https://docker-registry.contegris.com/v2', 'Docker_Registry') {
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
