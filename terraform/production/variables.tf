variable "domain_name" {
  type    = string
  description = "The domain name for the website."
  default = "admin-portal-11ec-uk.techomc.com"
}

variable "s3_bucket_origin" {
  default = "s3://admin-portal-production-uk.techomc.com"
}

variable "certificate_arn" {
  type = string
  description = "ARN of the production certificate"
  default = "arn:aws:acm:us-east-1:294553143120:certificate/87b97dda-191c-4f2e-b0b9-25e4930234ab"
}

variable "bucket_name" {
  type    = string
  description = "The name of the bucket without the www. prefix. Normally domain_name."
  default = "admin-portal.uk.techomc.com"
}

variable "common_tags" {
  type = map
  description = "Common tags you want applied to all components."

  default = {
    App = "admin-portal-ui"
    Environement = "production"
  }
}

variable "region" {
  type    = string
  default = "eu-west-2"
}

variable "zone_id" {
  type    = string
  default = "Z06187413SGI7PBVBQE3O"
}

variable "record_ttl" {
  type    = string
  default = "300"
}