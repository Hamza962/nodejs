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
    //test
    stages {
        stage('Intializing_Builder..'){
            agent { label  'Docker_builder'}
            stages{
                stage('Buid_Docker_Image'){

                    when {
                        branch 'main'
                    }
                    steps {
                        script {
                            app = docker.build("node_dev")

                        }
                    }
                }
                /*   stage('Tag Docker Image'){
                         steps{
                            echo 'checking tag EXISTS'
                            script{
                        //        version = readFile "${env.WORKSPACE}/example_env"
                          //      env.WORKSPACE = pwd()

                                 def status_check = sh returnStatus: true, script:"""docker image inspect  ${registry}/node_dev:${env.BUILD_NUMBER}"""
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
                     } */

                stage('Push Docker Image') {
                    when {
                        branch 'main'
                    }
                    steps {
                        script {
                            app.tag()
                            env.WORKSPACE = pwd()
                            //def version = readFile "${env.WORKSPACE}/example_env"
                            docker.withRegistry('https://docker-registry.contegris.com/v2', 'Docker_Registry') {
                                app.push("${env.BUILD_NUMBER}")
                            }
                        }
                    }
                }
                stage("Sending Image-Tag In Email Notification to QA") {
                    steps {

                        mail to: 'hamza.khalid@grp.contegris.com'/*'amna.zafar@grp.contegris.com,muhammad.hamza@grp.contegris.com'*/, from: 'devops@grp.contegris.com', cc: 'hamza.khalid@grp.contegris.com',
                                subject: "Testing Required for Docker New Image-Tag For Project : ${env.JOB_NAME}",
                                body: "Dear Concerned QA, \n\n Newly Pushed Image-Tag For Project: ${env.JOB_NAME} Is : ${env.BUILD_NUMBER}.\n Enter Above Provided Image-Tag In Following URL:${BUILD_URL}input \n\nBR \nTeam Devops"
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
