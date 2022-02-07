# admin-portal-staging-uk.techomc.com
resource "aws_route53_record" "admin-portal-staging-uk_techomc_com" {
  zone_id = var.zone_id
  name    = var.domain_name
  type    = "CNAME"
  ttl     = var.record_ttl

  records = ["${aws_cloudfront_distribution.admin_portal_techomc_com.domain_name}"]
}
