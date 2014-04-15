#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    manage
    ~~~~~~

    Command-line utilities for the Kibera School Project static site.

    :author: Philip Schleihauf
    :copyright: © 2014 by Feedback Labs
    :license: BSD, see LICENSE for more details.
"""

from flask.ext.script import Manager
from app import app
from flask_frozen import Freezer

manager = Manager(app)
freezer = Freezer(app, with_static_files=False)


@manager.command
def build():
    freezer.freeze()


@manager.command
def preview():
    freezer.run()


@manager.command
def commit(confirm=True):
    """Build the site and commit it to the gh-pages branch."""
    # build
    # branch ? pass : create
    # checkout
    # apply new version
    # anything changed ? continue : abort
    # confirm ? prompt with change summary : pass
    # commit changes
    # go back to original branch
    print('hello')


if __name__ == '__main__':
    manager.run()
