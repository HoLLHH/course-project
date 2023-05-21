package com.example.demo.config;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
//实体类路径
@EntityScan(basePackages = "com.example.demo.entity")
//仓库路径
@EnableJpaRepositories(basePackages = "com.example.demo.repository")

// 审计支持
@EnableJpaAuditing
public class JpaAutoConfiguration {
    @Bean
    public ThreadPoolTaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor taskExecutor = new ThreadPoolTaskExecutor();
        taskExecutor.setCorePoolSize(10);
        taskExecutor.setMaxPoolSize(10);
        taskExecutor.setThreadNamePrefix("TaskExecutorWorker-");
        taskExecutor.setQueueCapacity(100);
        return taskExecutor;
    }
}
