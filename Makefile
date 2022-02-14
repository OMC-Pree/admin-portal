all: run
# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-z0-9A-Z_-]+:.*?## / {printf "\033[36m%-45s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)


#### Build dev
build-dev: 
	cd ui && yarn build:dev

#### Build staging
build-staging:
	cd ui && yarn build:staging

#### Build production
build-prod:
	cd ui && yarn build:production
	
#### Upload to dev
dev-sync:
	cd ui && aws s3 sync build s3://admin-portal-dev-uk.techomc.com

#### Upload to staging
stg-sync:
	cd ui && aws s3 sync build s3://admin-portal-staging-uk.techomc.com

#### Upload to prod
# prod-sync:
# 	cd ui && aws s3 sync build s3://admin-portal-production-uk.techomc.com

#### Terraform deploy development
init-dev: ## terraform init
	cd terraform/development ; terraform init

validate-dev: #t-check-envs-loaded ## check-envs-loaded + lint + validate
	terraform fmt
	terraform validate

plan-dev: validate-dev ## `terraform plan` will show you what will be change if apply
	cd terraform/development ; terraform plan

deploy-dev: ## terraform apply -auto-approve
	cd terraform/development ; validate-dev ; terraform apply -auto-approve

refresh-only-dev : ## terraform apply -refresh-only
	cd terraform/development ; validate-dev ; terraform apply -refresh-only

#### Terraform deploy staging
# init-staging: ## terraform init
# 	cd terraform/staging ; terraform init

# validate-staging: #t-check-envs-loaded ## check-envs-loaded + lint + validate
# 	terraform fmt
# 	terraform validate

# plan-staging: validate-staging ## `terraform plan` will show you what will be change if apply
# 	cd terraform/staging ; terraform plan

# deploy-staging: ## terraform apply -auto-approve
# 	cd terraform/staging ; validate-staging ; terraform apply -auto-approve

# refresh-only-staging : ## terraform apply -refresh-only
# 	cd terraform/staging ; validate-staging ; terraform apply -refresh-only

# #### Terraform deploy production
# init-prod: ## terraform init
# 	cd terraform/production ; terraform init

# validate-prod: #t-check-envs-loaded ## check-envs-loaded + lint + validate
# 	terraform fmt
# 	terraform validate

# plan-prod: validate-prod ## `terraform plan` will show you what will be change if apply
# 	cd terraform/production ; terraform plan

# deploy-prod: ## terraform apply -auto-approve
# 	cd terraform/production ; validate-prod ; terraform apply -auto-approve

# refresh-only-prod : ## terraform apply -refresh-only
# 	cd terraform/production ; validate-prod ; terraform apply -refresh-only

.PHONY: all help init-dev validate-dev plan-dev deploy-dev refresh-only-dev \
		init-staging validate-staging plan-staging deploy-staging refresh-only-staging \
		init-prod validate-prod plan-prod deploy-prod refresh-only-prod
	
