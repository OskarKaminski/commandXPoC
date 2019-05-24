import { observable, computed } from "mobx"

class AppStore {
    @observable loading = 0
    @observable confirmation = {}
    @observable confirmationFixed = {}

    startLoading = () => {
        this.loading++
    }

    stopLoading = () => {
        this.loading--
    }

    @computed get isLoading() {
        return this.loading > 0
    }

    openConfirmation = (params) => {
        this.confirmation = {
            ...params,
            disabled: true
        }
    }

    closeConfirmation = () => {
        this.confirmation = {}
    }

    openConfirmationFixed = (params) => {
        const onSuccess = () => {
            params.onSuccess()
            this.closeConfirmationFixed()
        }
        this.confirmationFixed = {
            ...params,
            onSuccess
        }
    }

    closeConfirmationFixed = () => {
        this.confirmationFixed = {}
    }
}

export default new AppStore()