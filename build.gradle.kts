/*
 * This file was generated by the Gradle 'init' task.
 */

plugins {
    `java-library`
    `maven-publish`
}


repositories {
    mavenLocal()
    maven {
        url = uri("https://repo.maven.apache.org/maven2/")
    }
}

dependencies {
    api("com.google.guava:guava:31.1-jre")
    api("com.google.code.gson:gson:2.10")
    api("org.apache.commons:commons-lang3:3.12.0")
    compileOnly("se.curity.identityserver:identityserver.sdk:8.2.0")
    compileOnly("org.slf4j:slf4j-api:2.0.3")
    compileOnly("jakarta.validation:jakarta.validation-api:3.0.0")
}

group = "com.example.curity"
version = "1.0.0-SNAPSHOT"
description = "Curity Microblink Authentication Action"
java.sourceCompatibility = JavaVersion.VERSION_17

publishing {
    publications.create<MavenPublication>("maven") {
        from(components["java"])
    }
}

tasks.withType<JavaCompile>() {
    options.encoding = "UTF-8"
}

tasks.withType<Javadoc>() {
    options.encoding = "UTF-8"
}

tasks.clean.get().finalizedBy("cleanMicroblink", "cleanCopiedMicroblinkFrontendResources")

tasks.register<Copy>("copyMicroblinkFrontendDependencies") {
    dependsOn("installMicroblinkDeps")

    doFirst {
        println("Copying frontend dependencies to resources dir")
    }

    from("node_modules/@microblink/blinkid-in-browser-sdk/resources")
    into(layout.projectDirectory.dir("src/main/resources/webroot/assets"))

    finalizedBy("cleanMicroblink")
}

tasks.processResources.get().dependsOn("copyMicroblinkFrontendDependencies")

tasks.register<Sync>("copyDependencies") {
    from(configurations.runtimeClasspath)
    into(layout.buildDirectory.dir("microblinkscanid"))
}

tasks.register<Copy>("copyJar") {
    val jarTask = tasks.jar.get()
    dependsOn(jarTask)

    from(jarTask.destinationDirectory)
    into(layout.buildDirectory.dir("microblinkscanid"))
}

tasks.register<GradleBuild>("buildPlugin") {
    tasks = listOf(
        "copyDependencies",
        "copyJar"
    )
}

tasks.register<Exec>("installMicroblinkDeps") {
    commandLine("npm", "install", "@microblink/blinkid-in-browser-sdk")
}

tasks.register("cleanMicroblink"){
    doLast {
        println("Cleaning up Microblink npm dependencies")
        delete("node_modules")
        delete("package.json")
        delete("package-lock.json")
    }
}

tasks.register<Delete>("cleanCopiedMicroblinkFrontendResources") {

    doLast {
        println("Deleting Microblink assets from resources")
    }

    layout.projectDirectory.dir("src/main/resources/webroot/assets/").asFile.listFiles()?.forEach {
        if (it.isDirectory) {
            it.deleteRecursively()
        } else if (it.name != ".gitignore") {
            delete(it)
        }
    }
}
