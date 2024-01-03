from profiles.models import Visitor
from django.utils import timezone
 

class UniqueVisitorMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Get the original visitor's IP address from X-Forwarded-For header
        ip_address = request.META.get('HTTP_X_FORWARDED_FOR', None)
        if ip_address:
            ip_address = ip_address.split(",")[0].strip()
        else:
            # If X-Forwarded-For is not present, fall back to REMOTE_ADDR
            ip_address = request.META.get('REMOTE_ADDR')

        # Get user agent information
        user_agent = request.META.get('HTTP_USER_AGENT', '')

        # Combine IP address and user agent for more accurate tracking
        identifier = f"{ip_address}-{user_agent}"

        # Try to get the existing visitor
        try:
            visitor = Visitor.objects.get(identifier=identifier)
            # Update the timestamp of the last visit
            visitor.visit_time = timezone.now()
            visitor.save()
        except Visitor.DoesNotExist:
            # If the visitor doesn't exist, create a new one
            visitor = Visitor.objects.create(identifier=identifier)

        response = self.get_response(request)
        return response
