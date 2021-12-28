pipeline {
	agent any
	options {
    buildDiscarder(logRotator(numToKeepStr: '5', artifactNumToKeepStr: '15',daysToKeepStr:'30',artifactDaysToKeepStr:'30'))
  }
    environment{
    registry = "docker-registry.contegris.com"    
    }    
  //test     
 triggers {
        githubPush()
   pollSCM('') // Enabling being build on Push
  }
    
	stages {
       //stage('Build') {
         //   steps {
           //     echo 'Running build automation'
             //   sh './gradlew build --no-daemon'
              //archiveArtifacts artifacts: 'dist/node.zip'
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
                 stage("Deployment To DEV"){
                     steps{
                     script{ 
                         try{
                             sh """ docker rm -f node"""
                             echo "Previuos Container Stopped And Removed"
                             docker_run()
                             
                         }
                         catch(Exception err){
                         echo 'Node Container Not Running before' + err.toString()
                         docker_run()
                         
                         }
                     }
                 }
                 }
        }
         }
         }
post {
            failure {
						mail to : 'hamza.khalid@grp.contegris.com', from: 'devops@grp.contegris.com',
						subject: "Devops Failure Notification: ${env.BUILD_TAG}",
						body: "${env.JOB_NAME} has been failed. \n\nView complete logs:\n ${env.BUILD_URL}console\n\n BR\nTeam Devops"

            }
            success {
						mail to: 'hamza.khalid@grp.contegris.com', from: 'devops@grp.contegris.com',
						//subject: "Success Build: ${env.JOB_NAME}",			 
						//subject: "Devops Alert: Project:${env.PROJECT_NAME} Job Name:${env.JOB_NAME} Build:${env.BUILD_NUMBER} Status:${env.BUILD_STATUS} ",
						subject: "Devops Success Notification: ${env.BUILD_TAG}",
						body: "Dear Concerned\n\n${env.JOB_NAME} has been completed Successfully.\nQA Approved by : Hamza_DevOps\n View complete logs: ${env.BUILD_URL}console\n\n BR\nTeam Devops"

            }
}
}
def docker_run() {
echo "RUNNING CONTAINER....."
sh """ docker run -p 8081:8081 --name node -d  ${registry}/node_test:${version}"""
 }
