// src/smartContracts.js

import Web3 from 'web3';
import logger from './utils/logger'; // Assuming you have a logger utility

class SmartContracts {
    private web3: Web3;
    private contract: any; // Replace with the appropriate contract type
    private contractAddress: string;

    constructor(providerUrl: string, contractAddress: string, abi: any) {
        this.web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));
        this.contractAddress = contractAddress;
        this.contract = new this.web3.eth.Contract(abi, contractAddress);
    }

    // Method to deploy a new smart contract
    public async deployContract(bytecode: string, deployerAddress: string, privateKey: string): Promise<string> {
        const contract = new this.web3.eth.Contract(this.contract.options.jsonInterface);
        const deployTx = contract.deploy({ data: bytecode });

        const gasEstimate = await deployTx.estimateGas();
        const tx = {
            from: deployerAddress,
            gas: gasEstimate,
            data: deployTx.encodeABI(),
        };

        const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
        const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        logger.info(`Contract deployed at address: ${receipt.contractAddress}`);
        return receipt.contractAddress;
    }

    // Method to call a contract function
    public async callFunction(functionName: string, args: any[], fromAddress: string): Promise<any> {
        try {
            const result = await this.contract.methods[functionName](...args).call({ from: fromAddress });
            logger.info(`Function ${functionName} called successfully: ${result}`);
            return result;
        } catch (error) {
            logger.error(`Error calling function ${functionName}: ${error.message}`);
            throw new Error('Function call failed');
        }
    }

    // Method to send a transaction to a contract function
    public async sendTransaction(functionName: string, args: any[], fromAddress: string, privateKey: string): Promise<string> {
        try {
            const gasEstimate = await this.contract.methods[functionName](...args).estimateGas({ from: fromAddress });
            const tx = {
                from: fromAddress,
                to: this.contractAddress,
                gas: gasEstimate,
                data: this.contract.methods[functionName](...args).encodeABI(),
            };

            const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
            const receipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            logger.info(`Transaction sent for function ${functionName}: ${receipt.transactionHash}`);
            return receipt.transactionHash;
        } catch (error) {
            logger.error(`Error sending transaction for function ${functionName}: ${error.message}`);
            throw new Error('Transaction sending failed');
        }
    }

    // Method to listen for events emitted by the contract
    public listenForEvents(eventName: string, callback: (error: any, event: any) => void): void {
        this.contract.events[eventName]({}, (error, event) => {
            if (error) {
                logger.error(`Error listening for event ${eventName}: ${error.message}`);
            } else {
                logger.info(`Event ${eventName} received: ${JSON.stringify(event)}`);
                callback(null, event);
            }
        });
    }

    // Method to get the contract's current state
    public async getContractState(): Promise<any> {
        try {
            const state = await this.contract.methods.getState().call(); // Replace with actual state retrieval method
            logger.info(`Current contract state: ${JSON.stringify(state)}`);
            return state;
        } catch (error) {
            logger.error(`Error retrieving contract state: ${error.message}`);
            throw new Error('Contract state retrieval failed');
        }
    }
}

export default SmartContracts;
