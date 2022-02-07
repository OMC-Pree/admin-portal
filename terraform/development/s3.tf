data "aws_iam_policy_document" "admin_portal_s3_policy" {
  statement {
    actions = [
      "s3:GetObject"
    ]

    principals {
      identifiers = ["*"]
      type        = "AWS"
    }

    resources = [
      "arn:aws:s3:::${var.bucket_name}/*"
    ]
  }
}

// Bucket for website.
resource "aws_s3_bucket" "admin-portal" {
  bucket = var.bucket_name
  acl    = "public-read"
  policy = data.aws_iam_policy_document.admin_portal_s3_policy.json

  cors_rule {
    allowed_headers = ["Authorization", "Content-Length"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }

  website {
    index_document = "index.html"
    error_document = "index.html"
  }

  tags = var.common_tags
}
