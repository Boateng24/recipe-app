"""
Django command to wait for the database to be available
"""

import time
from typing import Any, Optional
from psycopg2 import OperationalError as Psycopg2OpError
from django.db.utils import OperationalError
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    """ Django command to wait for database. """

    def handle(self, *args: Any, **options: Any):
        """Entrypoint for command."""
        MAX_RETRIES = 10
        self.stdout.write('Waiting for database...')
        for _ in range(MAX_RETRIES):
            try:
                self.check(databases=['default'])
                break
            except (Psycopg2OpError, OperationalError):
                self.stdout.write('Database unavailable, waiting 1 second...')
                time.sleep(1)
        else:
            self.stdout.write(self.style.ERROR('Failed to connect to database after multiple attempts!'))
            return
        self.stdout.write(self.style.SUCCESS('Database available!'))