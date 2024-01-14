
import { Injectable } from "@nestjs/common"
import HDWalletProvider from "@machinomy/hdwallet-provider"
import {Web3} from "web3"
import { RegisteredSubscription } from "web3-eth"
@Injectable()
export default class MetamaskService {
	private web3 : Web3<RegisteredSubscription> 

	constructor() {
		//testing only
		const localKeyProvider =  HDWalletProvider.mnemonic({
			mnemonic: "agent merit inspire runway priority wonder height renew once high appear robust",
			rpc: "https://api.baobab.klaytn.net:8651"
		})

		localKeyProvider.getAddresses().then(x => console.log(x))

		this.web3 = new Web3(localKeyProvider)
	}

}