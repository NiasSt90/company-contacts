String label = "bvo-contacts-ui"
String gitCommitHash = "UNKNOWN"
String gitVersionString = "UNKNOWN"

podTemplate(label: label,
		runAsUser: "1000",
		containers: [containerTemplate(name: 'podman', image: 'quay.io/podman/stable', ttyEnabled: true, command: 'cat')],
		volumes: [
				//bind-mount a local host directory as cache into /root/.npm to avoid downloading every time the whole internet ;)
				hostPathVolume(hostPath: '/var/tmp/nodeModules', mountPath: '/root/.npm'),
				//hostPathVolume(hostPath: '/dev/fuse', mountPath: '/dev/fuse'),
				hostPathVolume(hostPath: '/var/tmp/containers-cache', mountPath: '/var/lib/containers')
		]) {
	node(label) {

		currentBuild.displayName = "$GERRIT_PROJECT"
		currentBuild.description = "${env.GERRIT_CHANGE_SUBJECT} branch=$GERRIT_BRANCH refspec=$GERRIT_REFSPEC"

		stage('Checkout') {
			echo "gerrit project: ${GERRIT_PROJECT}, branch: ${GERRIT_BRANCH}, gerrit refspec: ${GERRIT_REFSPEC}"
			git branch: '$GERRIT_BRANCH', credentialsId: 'jenkins-gerrit-key', url: 'ssh://jenkins@gerrit-ssh.gerrit.svc.cluster.local:29418/$GERRIT_PROJECT'

			sshagent (credentials: ['jenkins-gerrit-key']) {
				if (env.GERRIT_NEWREV) {
					sh "git fetch origin ${GERRIT_NEWREV}"
				}
				else {
					sh "git fetch origin ${GERRIT_REFSPEC}"
				}
				sh "git checkout FETCH_HEAD"
				currentBuild.description = sh returnStdout: true, script: "git log --pretty=format:\"%h %an<%ae> %s\" -1"
				gitCommitHash = sh returnStdout: true, script: "git rev-parse FETCH_HEAD"
				gitVersionString = sh returnStdout: true, script: "git log --pretty='format:%h %s' -q -1 FETCH_HEAD"
			}
		}
		stage('Build') {
			container('podman') {
				sh 'id'
				sh 'mount'
				sh 'podman --log-level debug info'
				sh 'podman build -t nexus-docker.onesty-tech.de/bvo-contacts-ui ' +
					'--build-arg GIT_COMMIT="' + gitCommitHash.trim() + '" ' +
					'--build-arg GIT_VERSION="' + gitVersionString.trim() + '" .'
			}
		}
		stage('Verify') {
			container('podman') {
				//TODO: integrate npm tests
			}
		}
		stage('Deploy') {
			container('podman') {
				if (env.GERRIT_BRANCH == 'master' && env.GERRIT_EVENT_TYPE == 'change-merged') {
					//Push the docker image to our registry nexus-docker.onesty-tech.de
					withCredentials([usernamePassword(credentialsId: 'nexus',
							usernameVariable: 'NEXUS_LOGIN', passwordVariable: 'NEXUS_PASSWORD')]) {
						sh 'podman login nexus-docker.onesty-tech.de -u $NEXUS_LOGIN -p $NEXUS_PASSWORD'
						sh 'podman push nexus-docker.onesty-tech.de/bvo-contacts-ui'
					}
					if (env.DEPLOY_TARGET_STAGE && (env.DEPLOY_TARGET_STAGE == 'test only' || env.DEPLOY_TARGET_STAGE == 'all available')) {
						//not available
					}
					if (env.DEPLOY_TARGET_STAGE && (env.DEPLOY_TARGET_STAGE == 'live only' || env.DEPLOY_TARGET_STAGE == 'all available')) {
						//Deploy to K8s
						withEnv(["GIT_VERSION="+gitCommitHash]) {
							kubernetesDeploy configs: 'k8s/*.yaml', kubeconfigId: 'JENKINS_K8S_CONFIG', enableConfigSubstitution: true
						}
						office365ConnectorSend message: "Project:" + currentBuild.displayName + ', git-rev: ' + currentBuild.description, status:"Deployed to LIVE", webhookUrl: 'https://outlook.office.com/webhook/d19bdeb0-1d82-48ca-985c-0828803de2b3@0d7025ff-e3e6-45ee-a39d-3353420f7fdc/JenkinsCI/40bda29332b44d0eb4703258488d3db7/f26c77a0-986c-4821-bda2-87a828c9d144'
					}
				}
            else {
            	echo 'No master-merge, skipped Docker Build/Push'
            }
			}
		}
	}
}
