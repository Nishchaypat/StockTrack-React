from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Test command to check if custom management commands work'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Test command works!'))

