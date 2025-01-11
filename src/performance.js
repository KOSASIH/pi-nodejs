// src/performance.js

import { performance } from 'perf_hooks';
import os from 'os';
import logger from './utils/logger'; // Assuming you have a logger utility
import axios from 'axios'; // For sending data to external monitoring tools

class PerformanceMonitor {
    private metrics: any = {};
    private alertThresholds: { [key: string]: number } = {
        responseTime: 200, // milliseconds
        memoryUsage: 80, // percentage
        cpuLoad: 80, // percentage
    };

    // Method to start monitoring performance
    public startMonitoring() {
        setInterval(() => {
            this.collectMetrics();
            this.checkAlerts();
        }, 5000); // Collect metrics every 5 seconds
    }

    // Method to collect performance metrics
    private collectMetrics() {
        const memoryUsage = process.memoryUsage();
        const cpuLoad = this.getCpuLoad();

        this.metrics = {
            responseTime: this.getAverageResponseTime(),
            memoryUsage: (memoryUsage.rss / os.totalmem()) * 100, // Convert to percentage
            cpuLoad: cpuLoad,
        };

        logger.info(`Performance Metrics: ${JSON.stringify(this.metrics)}`);
    }

    // Method to get average response time (placeholder)
    private getAverageResponseTime(): number {
        // Implement logic to calculate average response time
        return Math.random() * 300; // Simulated response time
    }

    // Method to get CPU load
    private getCpuLoad(): number {
        const cpus = os.cpus();
        const totalIdle = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
        const totalTick = cpus.reduce((acc, cpu) => acc + Object.values(cpu.times).reduce((a, b) => a + b, 0), 0);
        return 100 - Math.round((totalIdle / totalTick) * 100);
    }

    // Method to check for performance alerts
    private checkAlerts() {
        if (this.metrics.responseTime > this.alertThresholds.responseTime) {
            logger.warn(`High response time detected: ${this.metrics.responseTime}ms`);
            this.sendAlert('High response time', this.metrics.responseTime);
        }

        if (this.metrics.memoryUsage > this.alertThresholds.memoryUsage) {
            logger.warn(`High memory usage detected: ${this.metrics.memoryUsage}%`);
            this.sendAlert('High memory usage', this.metrics.memoryUsage);
        }

        if (this.metrics.cpuLoad > this.alertThresholds.cpuLoad) {
            logger.warn(`High CPU load detected: ${this.metrics.cpuLoad}%`);
            this.sendAlert('High CPU load', this.metrics.cpuLoad);
        }
    }

    // Method to send alerts (placeholder)
    private sendAlert(alertType: string, value: number) {
        // Implement logic to send alerts (e.g., email, SMS, webhook)
        logger.info(`Alert sent: ${alertType} - Value: ${value}`);
    }

    // Method to visualize performance data (placeholder)
    public visualizePerformanceData() {
        // Implement logic to visualize performance data (e.g., using Chart.js)
        logger.info('Visualizing performance data...');
    }

    // Method to integrate with external monitoring tools
    public async sendMetricsToMonitoringTool() {
        try {
            await axios.post('https://api.monitoringtool.com/metrics', this.metrics);
            logger.info('Metrics sent to monitoring tool successfully.');
        } catch (error) {
            logger.error(`Error sending metrics to monitoring tool: ${error.message}`);
        }
    }
}

export default new PerformanceMonitor();
